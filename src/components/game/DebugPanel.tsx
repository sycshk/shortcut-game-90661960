import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bug, RefreshCw, Download, Trash2, CheckCircle, XCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { leaderboardService } from '@/services/leaderboardService';
import { apiService } from '@/services/apiService';

interface DataStatus {
  name: string;
  serverUrl: string;
  serverStatus: 'loading' | 'success' | 'error' | 'empty';
  serverCount: number;
  localStorageKey: string;
  localCount: number;
  exportKey: string;
  exportCount: number;
  lastError?: string;
}

export const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataStatuses, setDataStatuses] = useState<DataStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);

  const checkDataStatus = async () => {
    setIsRefreshing(true);
    
    // Check API status
    const online = await apiService.ping();
    setApiOnline(online);
    
    const statuses: DataStatus[] = [];

    const dataFiles = [
      { name: 'Leaderboard', url: '/data/leaderboard.json', localKey: 'shortcut-leaderboard', exportKey: 'shortcut-export-leaderboard', countField: 'entries' },
      { name: 'Profiles', url: '/data/profiles.json', localKey: 'shortcut-user-profiles', exportKey: 'shortcut-export-profiles', countField: 'profiles' },
      { name: 'Sessions', url: '/data/sessions.json', localKey: 'shortcut-game-sessions', exportKey: 'shortcut-export-sessions', countField: 'sessions' },
      { name: 'History', url: '/data/history.json', localKey: 'shortcut-answer-history', exportKey: 'shortcut-export-history', countField: 'records' },
    ];

    for (const file of dataFiles) {
      let serverStatus: DataStatus['serverStatus'] = 'loading';
      let serverCount = 0;
      let lastError = '';

      if (online) {
        // Use API endpoints when available
        serverStatus = 'success';
        serverCount = -1; // API doesn't provide count easily
      } else {
        try {
          const res = await fetch(file.url + '?t=' + Date.now());
          if (res.ok) {
            const data = await res.json();
            const countData = data[file.countField];
            if (Array.isArray(countData)) {
              serverCount = countData.length;
            } else if (typeof countData === 'object' && countData !== null) {
              serverCount = Object.keys(countData).length;
            }
            serverStatus = serverCount > 0 ? 'success' : 'empty';
          } else {
            serverStatus = 'error';
            lastError = `HTTP ${res.status}: ${res.statusText}`;
          }
        } catch (err) {
          serverStatus = 'error';
          lastError = err instanceof Error ? err.message : 'Unknown error';
        }
      }

      // Check localStorage
      let localCount = 0;
      try {
        const localData = localStorage.getItem(file.localKey);
        if (localData) {
          const parsed = JSON.parse(localData);
          localCount = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
        }
      } catch {
        localCount = 0;
      }

      // Check export key
      let exportCount = 0;
      try {
        const exportData = localStorage.getItem(file.exportKey);
        if (exportData) {
          const parsed = JSON.parse(exportData);
          const countData = parsed[file.countField];
          if (Array.isArray(countData)) {
            exportCount = countData.length;
          } else if (typeof countData === 'object' && countData !== null) {
            exportCount = Object.keys(countData).length;
          }
        }
      } catch {
        exportCount = 0;
      }

      statuses.push({
        name: file.name,
        serverUrl: file.url,
        serverStatus,
        serverCount,
        localStorageKey: file.localKey,
        localCount,
        exportKey: file.exportKey,
        exportCount,
        lastError,
      });
    }

    setDataStatuses(statuses);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkDataStatus();
    }
  }, [isOpen]);

  const handleDownloadExport = () => {
    leaderboardService.exportAllData();
  };

  const handleClearLocal = () => {
    if (confirm('This will clear all local game data. Are you sure?')) {
      localStorage.removeItem('shortcut-leaderboard');
      localStorage.removeItem('shortcut-user-profiles');
      localStorage.removeItem('shortcut-game-sessions');
      localStorage.removeItem('shortcut-answer-history');
      localStorage.removeItem('shortcut-export-leaderboard');
      localStorage.removeItem('shortcut-export-profiles');
      localStorage.removeItem('shortcut-export-sessions');
      localStorage.removeItem('shortcut-export-history');
      console.log('🗑️ Local data cleared');
      checkDataStatus();
    }
  };

  const getStatusIcon = (status: DataStatus['serverStatus']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'empty':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />;
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full bg-muted/80 hover:bg-muted"
        title="Open Debug Panel"
      >
        <Bug className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-[400px] max-h-[80vh] overflow-auto glass-card shadow-xl">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bug className="h-4 w-4" />
          Data Sync Debug
          {apiOnline ? (
            <Badge variant="outline" className="text-green-500 border-green-500 text-[10px]">
              <Wifi className="h-3 w-3 mr-1" />
              API Online
            </Badge>
          ) : (
            <Badge variant="outline" className="text-yellow-500 border-yellow-500 text-[10px]">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline Mode
            </Badge>
          )}
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={checkDataStatus} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-xs">
        {/* Data Status Table */}
        <div className="space-y-2">
          <div className="font-medium text-muted-foreground">Data Sources</div>
          {dataStatuses.map((status) => (
            <div key={status.name} className="bg-muted/50 rounded-lg p-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{status.name}</span>
                {getStatusIcon(status.serverStatus)}
              </div>
              <div className="grid grid-cols-3 gap-2 text-muted-foreground">
                <div>
                  <span className="block text-[10px] uppercase">{apiOnline ? 'API' : 'Server'}</span>
                  <Badge variant={status.serverStatus === 'error' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {apiOnline ? 'Connected' : `${status.serverCount} items`}
                  </Badge>
                </div>
                <div>
                  <span className="block text-[10px] uppercase">Local</span>
                  <Badge variant="outline" className="text-[10px]">
                    {status.localCount} items
                  </Badge>
                </div>
                <div>
                  <span className="block text-[10px] uppercase">Export</span>
                  <Badge variant="outline" className="text-[10px]">
                    {status.exportCount} items
                  </Badge>
                </div>
              </div>
              {status.lastError && (
                <div className="text-red-400 text-[10px] break-all">
                  Error: {status.lastError}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-blue-300">
          <div className="font-medium mb-1">ℹ️ How Sync Works</div>
          <ul className="space-y-0.5 text-[10px]">
            {apiOnline ? (
              <>
                <li>• <strong>API:</strong> SQLite database backend (live sync)</li>
                <li>• <strong>Local:</strong> Browser localStorage (backup)</li>
                <li>• Data syncs automatically to the server</li>
              </>
            ) : (
              <>
                <li>• <strong>Server:</strong> JSON files in /public/data/ (read-only)</li>
                <li>• <strong>Local:</strong> Browser localStorage (your active data)</li>
                <li>• Deploy with SQLite backend for live sync</li>
              </>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="text-xs h-7" onClick={handleDownloadExport}>
            <Download className="h-3 w-3 mr-1" />
            Download Export
          </Button>
          <Button size="sm" variant="destructive" className="text-xs h-7" onClick={handleClearLocal}>
            <Trash2 className="h-3 w-3 mr-1" />
            Clear Local
          </Button>
        </div>

        {/* Console Log Hint */}
        <div className="text-muted-foreground text-[10px]">
          💡 Check browser console for detailed sync logs
        </div>
      </CardContent>
    </Card>
  );
};

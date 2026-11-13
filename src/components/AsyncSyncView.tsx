import React, { useState, useEffect, useRef } from 'react';
import { MicroVideoClip } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  MessageSquare,
  Send,
  Video,
  Mic,
  Camera,
  Plus,
  Share2,
} from 'lucide-react';

interface AsyncSyncViewProps {
  videos: MicroVideoClip[];
  onAddVideoClip?: (video: MicroVideoClip) => void;
}

export const AsyncSyncView: React.FC<AsyncSyncViewProps> = ({
  videos: initialVideos,
  onAddVideoClip,
}) => {
  const [videoList, setVideoList] = useState<MicroVideoClip[]>(initialVideos);
  const [selectedVideoId, setSelectedVideoId] = useState<string>(initialVideos[0]?.id || 'v1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(14);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState<boolean>(false);

  // Recorder Modal state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordingMode, setRecordingMode] = useState<'screen' | 'camera'>('screen');
  const [recordingTitle, setRecordingTitle] = useState<string>('Nuovo Micro-Update Q3');

  const selectedVideo = videoList.find((v) => v.id === selectedVideoId) || videoList[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback timer effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= selectedVideo.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, selectedVideo.duration]);

  // Recording countdown effect
  useEffect(() => {
    let recTimer: NodeJS.Timeout | null = null;
    if (isRecording) {
      recTimer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            setIsRecording(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (recTimer) clearInterval(recTimer);
    };
  }, [isRecording]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (second: number) => {
    setCurrentTime(Math.min(second, selectedVideo.duration));
  };

  const handleToggleActionItem = (itemId: string) => {
    setVideoList((prev) =>
      prev.map((v) => {
        if (v.id !== selectedVideo.id) return v;
        return {
          ...v,
          actionItems: v.actionItems.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      second: currentTime,
      author: 'Alex (Tu)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      text: newCommentText.trim(),
      createdAt: 'Proprio ora',
    };

    setVideoList((prev) =>
      prev.map((v) => {
        if (v.id !== selectedVideo.id) return v;
        return {
          ...v,
          pinpointComments: [...v.pinpointComments, newComment],
        };
      })
    );

    setNewCommentText('');
  };

  const handleFinishRecording = () => {
    setIsRecording(false);
    const newClip: MicroVideoClip = {
      id: `v-${Date.now()}`,
      title: recordingTitle || 'Micro-Aggiornamento 60s',
      author: 'Alex (Tu)',
      authorRole: 'Senior Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      duration: Math.max(12, recordingSeconds || 42),
      posterImage: selectedVideo.posterImage,
      createdAt: 'Oggi, Adesso',
      transcript: [
        { second: 0, text: 'Micro-video registrato asincrono per evitare una call da 30 minuti.' },
        { second: 12, text: 'A 0:12: revisionati i punti salienti del backlog sprint.' },
        { second: 28, text: 'A 0:28: allineamento completato con il design token di Marco.' },
        { second: 40, text: 'Scrivete direttamente nei commenti sul secondo esatto se avete dubbi.' },
      ],
      actionItems: [
        { id: `a-${Date.now()}-1`, task: 'Verificare metriche di rollout nel cluster', assignee: 'Alex', priority: 'high', completed: false },
        { id: `a-${Date.now()}-2`, task: 'Condividere link del video con il reparto marketing', assignee: 'Team', priority: 'medium', completed: false },
      ],
      pinpointComments: [
        {
          id: `c-${Date.now()}-1`,
          second: 12,
          author: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
          text: 'Ottimo aggiornamento chiaro, approvato!',
          createdAt: 'Adesso',
        },
      ],
    };

    setVideoList([newClip, ...videoList]);
    setSelectedVideoId(newClip.id);
    setIsRecordingModalOpen(false);
    setRecordingSeconds(0);
    if (onAddVideoClip) onAddVideoClip(newClip);
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
            <span>AsyncSync Platform</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Meeting Video Code-Diff</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Micro-Video Asincroni Strutturati
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Niente riunioni di 45 minuti. Registra 60s, estrai to-do list e commenta al secondo esatto.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRecordingModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm shadow-violet-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>Registra 60s Micro-Video</span>
          </button>
        </div>
      </div>

      {/* Video Selector Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {videoList.map((video) => {
          const isSelected = video.id === selectedVideo.id;
          return (
            <button
              key={video.id}
              onClick={() => {
                setSelectedVideoId(video.id);
                setCurrentTime(0);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all shrink-0 w-72 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-violet-500/60 shadow-md shadow-violet-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={video.avatar}
                  alt={video.author}
                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                />
                <div className="truncate">
                  <span className="text-xs font-bold text-white block truncate">
                    {video.author}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {video.authorRole} · {video.createdAt}
                  </span>
                </div>
              </div>
              <h4 className="text-xs font-medium text-slate-200 line-clamp-2 leading-relaxed">
                {video.title}
              </h4>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 tabular-nums">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-violet-400" />
                  <span>{formatSec(video.duration)}s</span>
                </span>
                <span className="text-violet-300">
                  {video.actionItems.length} action items
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Video & Context Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Video Player & Timeline Scrubber (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
            {/* Poster / Video Display */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={selectedVideo.posterImage}
                alt={selectedVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Center Play/Pause Overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform"
                aria-label={isPlaying ? 'Pausa' : 'Riproduci'}
              >
                <div className="w-16 h-16 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-xl shadow-violet-600/40 backdrop-blur-sm hover:bg-violet-500 transition-colors">
                  {isPlaying ? (
                    <Pause className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" />
                  )}
                </div>
              </button>

              {/* Top Video Metadata Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200">
                  <img
                    src={selectedVideo.avatar}
                    alt={selectedVideo.author}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold">{selectedVideo.author}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-violet-400 font-mono">0:{selectedVideo.duration}s max</span>
                </div>

                <div className="p-1.5 px-3 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 font-mono">
                  {formatSec(currentTime)} / {formatSec(selectedVideo.duration)}
                </div>
              </div>

              {/* Waveform Visualization Bar */}
              {isPlaying && (
                <div className="absolute bottom-16 left-6 right-6 flex items-end gap-1 h-8 opacity-80 pointer-events-none">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const heightPercent = 20 + Math.sin((i + currentTime * 3) * 0.5) * 60;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-violet-400 rounded-full transition-all duration-100"
                        style={{ height: `${Math.max(10, heightPercent)}%` }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Video Controls & Pinpoint Scrubber */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              {/* Interactive Timeline Track with Pinpoint Comment Markers */}
              <div className="relative pt-2 pb-1">
                <div
                  className="relative h-2.5 bg-slate-800 rounded-full cursor-pointer group/track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    handleSeek(Math.round(ratio * selectedVideo.duration));
                  }}
                >
                  {/* Progress Fill */}
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full relative"
                    style={{
                      width: `${(currentTime / selectedVideo.duration) * 100}%`,
                    }}
                  />

                  {/* Comment Markers along timeline */}
                  {selectedVideo.pinpointComments.map((comment) => {
                    const leftPct = (comment.second / selectedVideo.duration) * 100;
                    return (
                      <button
                        key={comment.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(comment.second);
                        }}
                        title={`Commento a ${formatSec(comment.second)}: ${comment.text}`}
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 hover:scale-125 transition-transform cursor-pointer"
                        style={{ left: `${leftPct}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleSeek(0)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Ricomincia"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1 font-mono text-xs tabular-nums text-slate-400">
                    <span className="text-white font-semibold">{formatSec(currentTime)}</span>
                    <span>/</span>
                    <span>{formatSec(selectedVideo.duration)}</span>
                  </div>
                </div>

                {/* Speed Toggles */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
                  {[1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Synchronized Transcript: Clickable Phrases */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Trascrizione Sincronizzata (Clicca per saltare al secondo esatto)</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Auto-generata con IA
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {selectedVideo.transcript.map((line, idx) => {
                const isActive =
                  currentTime >= line.second &&
                  (idx === selectedVideo.transcript.length - 1 ||
                    currentTime < selectedVideo.transcript[idx + 1].second);

                return (
                  <div
                    key={idx}
                    onClick={() => handleSeek(line.second)}
                    className={`p-2 rounded-lg text-xs transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-violet-950/60 border border-violet-700/50 text-white font-medium shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-mono text-violet-400 font-semibold shrink-0 pt-0.5">
                      {formatSec(line.second)}
                    </span>
                    <span className="leading-relaxed">{line.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Action Items & Pinpoint Comments (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Extracted Action Items */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">To-Do List Estratta Automaticamente</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                {selectedVideo.actionItems.filter((a) => a.completed).length}/
                {selectedVideo.actionItems.length} completati
              </span>
            </div>

            <div className="space-y-2.5">
              {selectedVideo.actionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleActionItem(item.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    item.completed
                      ? 'bg-slate-950/40 border-slate-800/80 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <p
                      className={`text-xs font-medium leading-snug ${
                        item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {item.task}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>Assegnato a: <strong>{item.assignee}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          item.priority === 'high'
                            ? 'text-rose-400 font-semibold'
                            : item.priority === 'medium'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }
                      >
                        Priorità {item.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pinpoint Comment Threads */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white">Commenti Puntuali al Secondo</h3>
              </div>
              <span className="text-[11px] text-violet-400 font-mono">
                {selectedVideo.pinpointComments.length} note
              </span>
            </div>

            {/* Existing comments */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {selectedVideo.pinpointComments.map((comment) => (
                <div
                  key={comment.id}
                  onClick={() => handleSeek(comment.second)}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-violet-500/40 transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-200">{comment.author}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded">
                      {formatSec(comment.second)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment Form linked to current timestamp */}
            <form onSubmit={handleAddComment} className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Lascia un appunto al timestamp corrente:</span>
                <span className="font-mono font-bold text-amber-400">
                  {formatSec(currentTime)}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Es. 'Ottimo punto, sistemiamo il border radius...'"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invia</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Recording Modal Simulator */}
      {isRecordingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-violet-400" />
                <h3 className="text-base font-bold text-white">
                  Registratore Micro-Video Asincrono (Max 60s)
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsRecordingModalOpen(false);
                  setIsRecording(false);
                }}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Chiudi
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Titolo dell'Aggiornamento
                </label>
                <input
                  type="text"
                  value={recordingTitle}
                  onChange={(e) => setRecordingTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Viewport Simulation Box */}
              <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
                {isRecording ? (
                  <div className="space-y-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
                      <Mic className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold font-mono text-white tabular-nums">
                        00:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        Limite massimo: 60 secondi
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-center p-4">
                    <Camera className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">
                      Cattura schermo + audio per spiegare l'idea senza convocare una riunione.
                    </p>
                  </div>
                )}

                {/* Mode Selector */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="flex gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setRecordingMode('screen')}
                      className={`px-2 py-1 text-[11px] rounded transition-colors ${
                        recordingMode === 'screen'
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      Schermo + Cursore
                    </button>
                    <button
                      onClick={() => setRecordingMode('camera')}
                      className={`px-2 py-1 text-[11px] rounded transition-colors ${
                        recordingMode === 'camera'
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      Webcam
                    </button>
                  </div>

                  {isRecording && (
                    <span className="px-2 py-1 bg-rose-600 text-white text-[10px] font-bold rounded uppercase tracking-wider animate-pulse">
                      REC
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsRecordingModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Annulla
              </button>

              {!isRecording ? (
                <button
                  onClick={() => {
                    setIsRecording(true);
                    setRecordingSeconds(0);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/30"
                >
                  <Circle className="w-3.5 h-3.5 fill-current" />
                  <span>Avvia Registrazione</span>
                </button>
              ) : (
                <button
                  onClick={handleFinishRecording}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Termina & Genera To-Do List IA</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

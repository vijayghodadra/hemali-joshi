/**
 * Singleton AudioContext Manager to handle mobile auto-play restrictions (unlocking)
 * and provide a shared context for the application.
 */
class AudioContextManager {
    private static instance: AudioContextManager;
    private context: AudioContext | null = null;
    private isUnlocked: boolean = false;

    private constructor() { }

    public static getInstance(): AudioContextManager {
        if (!AudioContextManager.instance) {
            AudioContextManager.instance = new AudioContextManager();
        }
        return AudioContextManager.instance;
    }

    public getContext(): AudioContext {
        if (!this.context) {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.context;
    }

    /**
     * Attempts to resume the AudioContext if it is suspended.
     * This should be called inside a user interaction handler (click, touchstart, keydown).
     */
    public async resumeContext(): Promise<void> {
        const ctx = this.getContext();

        if (ctx.state === 'suspended') {
            try {
                await ctx.resume();
                this.isUnlocked = true;
                console.log("AudioContext resumed/unlocked successfully.");
            } catch (error) {
                console.warn("Failed to resume AudioContext", error);
            }
        }
    }

    /**
     * Attaches global listeners to unlock audio on the first interaction.
     * Can be called once at app startup or component mount.
     */
    public initializeAutoUnlock(): void {
        if (typeof window === 'undefined') return;

        const unlockHandler = () => {
            this.resumeContext();
            // Once unlocked, we can remove the listeners
            if (this.context?.state === 'running') {
                window.removeEventListener('click', unlockHandler);
                window.removeEventListener('touchstart', unlockHandler);
                window.removeEventListener('keydown', unlockHandler);
            }
        };

        window.addEventListener('click', unlockHandler);
        window.addEventListener('touchstart', unlockHandler, { passive: true });
        window.addEventListener('keydown', unlockHandler);
    }
}

export default AudioContextManager;

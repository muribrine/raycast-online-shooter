function create_audio_handler(source, volume) {
    const HANDLER = document.createElement('audio');
    HANDLER.id = `${source}`;
    HANDLER.src = `${source}`;
    HANDLER.volume = volume;
    document.body.appendChild(HANDLER);
    return HANDLER;
}
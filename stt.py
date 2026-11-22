import json
from faster_whisper import WhisperModel
m = WhisperModel("large-v3", device="cpu", compute_type="int8")
for tag, lang in (("uz", "uz"), ("auto", None)):
    segs, info = m.transcribe("full.ogg", language=lang, word_timestamps=True, beam_size=5, vad_filter=False)
    out = {"lang": info.language, "prob": info.language_probability, "segments": []}
    for s in segs:
        out["segments"].append({"start": s.start, "end": s.end, "text": s.text,
                                "words": [[w.start, w.end, w.word] for w in (s.words or [])]})
    json.dump(out, open(f"out_{tag}.json", "w"), ensure_ascii=False, indent=1)
    print(tag, info.language, info.language_probability, " ".join(x["text"] for x in out["segments"]))

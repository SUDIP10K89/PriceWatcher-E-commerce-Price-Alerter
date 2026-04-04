import os
import multiprocessing as mp

if os.name == "nt":
    _orig_get_context = mp.get_context

    def _safe_get_context(method=None):
        if method == "fork":
            method = "spawn"
        return _orig_get_context(method)

    mp.get_context = _safe_get_context

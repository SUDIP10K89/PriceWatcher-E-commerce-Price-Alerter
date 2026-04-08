import sys

# Must run before importing rq to avoid 'fork' context on Windows.
import rq_compat  # noqa: F401

from rq.cli import main

if __name__ == "__main__":
    sys.exit(main())

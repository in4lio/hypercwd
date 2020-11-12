#!/usr/bin/env sh

if [ ! -r "$NNN_FIFO" ] ; then
    echo "FIFO is not available! (\$NNN_FIFO='$NNN_FIFO')" >&2
    exit 1
fi

if [[ -z "$NNN_DIR" ]]; then
    echo "NNN_DIR is not set!" >&2
    exit 1
fi

outp=$(eval echo \"$NNN_DIR\")

# use cat instead of 'exec <' to avoid issues with dash shell
cat "$NNN_FIFO" |\
while read -r selection ; do
    echo "$(dirname "$selection")" > "$outp"
done

rm -f "$outp"

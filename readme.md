# Verovio Renderer

This tool is supposed to render all MEI files in a given folder. It is available
as Docker image from https://hub.docker.com/r/edirom/staticverovioconverter.

Use as follows:

Move to the folder containing the MEI files to be converted, then use Docker as
follows:

docker run --rm -it -v $(pwd):/data edirom/staticVerovioConverter:latest

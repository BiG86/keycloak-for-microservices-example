#!/bin/sh

export LOADER_PATH="/book/conf,/book/lib"
java ${ADDITIONAL_JAVA_OPTS} ${JAVA_TOOL_OPTIONS} -cp /book/bin/book-manager-be.jar \
  -Dloader.main=it.snorcini.dev.bookmanager.BookManagerApplication \
  org.springframework.boot.loader.PropertiesLauncher

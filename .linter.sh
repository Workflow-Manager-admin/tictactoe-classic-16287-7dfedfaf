#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-16287-7dfedfaf/tic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


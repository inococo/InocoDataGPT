#!/bin/bash
cd "$(dirname "$0")" || exit

is_valid_sk_key() {
  local api_key=$1
  local pattern="^sk-[a-zA-Z0-9]{48}$"
  [[ $api_key =~ $pattern ]] && return 0 || return 1
}

echo -n "Enter your OpenAI Key (eg: sk...) or press enter to continue with no key: "
read OPENAI_API_KEY

if is_valid_sk_key $OPENAI_API_KEY || [ -z "$OPENAI_API_KEY" ]; th
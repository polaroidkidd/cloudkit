#!/bin/bash

# Function to convert camelCase to snake-case
camel_to_snake() {
    echo "$1" | sed -E 's/([a-z])([A-Z])/\1-\L\2/g' | tr '[:upper:]' '[:lower:]'
}

# Iterate over all files in the current directory
for file in *; do
    # Check if it's a file (not a directory)
    if [[ -f "$file" ]]; then
        # Convert the filename from camelCase to snake-case
        new_name=$(camel_to_snake "$file")
        
        # Rename the file if the new name is different
        if [[ "$file" != "$new_name" ]]; then
            mv "$file" "$new_name"
            echo "Renamed $file to $new_name"
        fi
    fi
done
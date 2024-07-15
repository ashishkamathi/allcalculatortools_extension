# allcalculatortools_extension
To produce a build from the attached sources, you'll need to set up the development environment and follow specific steps to build and package the Chrome extension. Here are the detailed instructions. This is an extenson built for a [comprehensive calculator](allcalculator.tools) users.

### Environment Setup

1. **Operating System**:
   - Ensure you are using a supported operating system. These instructions assume a Unix-based system such as macOS or a Linux distribution. Windows users can use WSL (Windows Subsystem for Linux) or adjust commands accordingly.
   - Recommended OS version: macOS 10.15+ or Ubuntu 20.04+.

2. **Node.js and npm**:
   - Ensure you have Node.js and npm installed. The recommended version for Node.js is 14.x or higher.
   - You can install Node.js and npm using the following commands:

     ```sh
     # For macOS using Homebrew
     brew install node

     # For Ubuntu using apt
     sudo apt update
     sudo apt install nodejs npm
     ```

3. **Versions**:
   - Node.js: 14.x or higher
   - npm: 6.x or higher

### Step-by-Step Command Line Sequence

1. **Clone the Repository**:
   - If you have a repository for the extension sources, clone it. If you are working with local files, navigate to the directory containing the source files.

   ```sh
   # Clone the repository (replace with your repository URL)
   git clone https://github.com/your-repo/chrome-extension.git

   # Navigate to the project directory
   cd chrome-extension
   ```

2. **Install Dependencies**:
   - If there are any dependencies listed in a `package.json` file, install them using npm. If there is no `package.json`, you can skip this step.

   ```sh
   # Install npm dependencies
   npm install
   ```

3. **Build the Extension**:
   - If there is a build script defined in `package.json`, use npm to run the build script. If the project doesn't require building (purely static files), you can skip this step.

   ```sh
   # Run the build script if it exists
   npm run build
   ```

4. **Prepare the Extension for Distribution**:
   - Ensure all necessary files are included and properly structured. The essential files are `manifest.json`, `background.js`, `popup.html`, `popup.js`, `icon.png`, and any other resources your extension uses.

   - Create a directory for the build output, if necessary.

   ```sh
   # Create a build directory
   mkdir build

   # Copy all necessary files to the build directory
   cp -r manifest.json background.js popup.html popup.js icon.png build/
   ```

5. **Package the Extension**:
   - Zip the build directory to create a package that can be uploaded to the Chrome Web Store or loaded as an unpacked extension.

   ```sh
   # Navigate to the build directory
   cd build

   # Zip the build directory
   zip -r ../chrome-extension.zip *
   ```

6. **Load the Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top right.
   - Click "Load unpacked" and select the `build` directory.

### Summary of Commands

```sh
# Ensure Node.js and npm are installed
node -v
npm -v

# Clone the repository (if applicable)
git clone https://github.com/your-repo/chrome-extension.git
cd chrome-extension

# Install dependencies (if applicable)
npm install

# Build the extension (if applicable)
npm run build

# Prepare the extension for distribution
mkdir build
cp -r manifest.json background.js popup.html popup.js icon.png build/

# Package the extension
cd build
zip -r ../chrome-extension.zip *

# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select the 'build' directory
```

By following these steps, you should be able to set up your environment, build the extension, and package it for distribution or installation in Chrome.

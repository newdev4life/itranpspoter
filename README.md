# iTransporter

A modern macOS application for uploading IPA files to App Store Connect.

![macOS](https://img.shields.io/badge/macOS-10.15+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🚀 **Easy IPA Upload** - Drag and browse to select IPA files
- 🔐 **Credential Management** - Securely save and manage Apple ID credentials
- 👥 **Team/Provider Support** - Fetch and select from multiple development teams
- 📊 **Real-time Progress** - Live upload progress with detailed logs
- 📜 **Upload History** - Track all past uploads with status
- 🎨 **Modern UI** - Native macOS design with glassmorphism effects

## Screenshots

<!-- Add screenshots here -->

## Requirements

- macOS 10.15 or later
- [Transporter](https://apps.apple.com/app/transporter/id1450874784) app installed
- Xcode Command Line Tools

## Installation

Download the latest release from the [Releases](../../releases) page.

### Available Builds
- **Intel Mac**: `iTransporter-x.x.x-mac.dmg` (x64)
- **Apple Silicon Mac**: `iTransporter-x.x.x-arm64-mac.dmg` (arm64)

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/iTransporter.git
cd iTransporter

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Build

```bash
# Build for current architecture
npm run build

# Build for specific architecture
npm run build -- --mac --x64
npm run build -- --mac --arm64
```

## Usage

1. **Environment Check** - The app will verify Transporter and Xcode CLT are installed
2. **Select IPA** - Click "瀏覽" to choose your .ipa file
3. **Enter Credentials** - Add your Apple ID and App-Specific Password
4. **Fetch Teams** - Click "獲取團隊列表" to load your development teams
5. **Upload** - Click "開始執行上傳" to start uploading

### Getting an App-Specific Password

1. Go to [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Navigate to Security > App-Specific Passwords
4. Generate a new password for iTransporter

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Desktop**: Electron 30
- **Build**: Vite + electron-builder
- **Storage**: electron-store

## License

MIT License © 2024 jimjay

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

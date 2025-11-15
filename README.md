# 🤖 Chatbot Flow Builder

A powerful and intuitive visual flow builder for creating chatbot conversation flows. Built with React, Vite, and React Flow.

![Chatbot Flow Builder](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![React Flow](https://img.shields.io/badge/React%20Flow-11.10.4-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🎨 **Drag & Drop Interface** - Intuitive node creation by dragging from the panel
- 🔗 **Visual Connections** - Connect nodes with animated edges
- ✏️ **Inline Editing** - Edit message content directly in the settings panel
- 🗑️ **Delete Functionality** - Remove nodes and edges with dedicated buttons
- ✅ **Flow Validation** - Validates flow before saving (ensures proper connections)
- 📱 **Responsive Design** - Clean, modern UI that works across devices
- 🎯 **Connection Rules** - Source handles can only have one outgoing edge
- 🔄 **Real-time Updates** - See changes instantly as you build your flow

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatbot-flow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 📦 Project Structure

```
chatbot-flow-builder/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── TextNode.jsx           # Custom text message node
│   │   ├── NodesPanel.jsx         # Panel with draggable nodes
│   │   ├── SettingsPanel.jsx      # Node editing panel
│   │   ├── SaveButton.jsx         # Save flow button
│   │   ├── ErrorNotification.jsx  # Error message display
│   │   ├── EdgeEditButton.jsx     # Custom edge with delete
│   │   └── FlowBuilder.jsx        # Main orchestrator
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎮 Usage Guide

### Creating Nodes

1. **Drag** the "Message" node from the right panel
2. **Drop** it onto the canvas
3. The node will be created with a default message

### Connecting Nodes

1. **Click and drag** from the right handle (source) of one node
2. **Connect** to the left handle (target) of another node
3. A blue animated line will appear showing the connection

### Editing Nodes

1. **Click** on any node to select it
2. The **Settings Panel** will appear on the right
3. **Edit** the text in the textarea
4. Changes are saved automatically

### Deleting Elements

- **Delete Node**: Click the ❌ button in the node header
- **Delete Edge**: Click the ❌ button on the connection line
- **Keyboard**: Select and press `Delete` or `Backspace`

### Saving Flow

1. Click the **"Save Changes"** button in the top-right
2. The flow will be validated:
   - ✅ **Success**: Flow saved if validation passes
   - ❌ **Error**: Shows error if more than one node has empty target

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Chatbot Flow Builder
VITE_PORT=3000
```

### Customizing Styles

Edit `src/index.css` to customize colors and styles:

```css
/* Change primary color */
.react-flow__edge-path {
  stroke: #your-color !important;
}
```

## 📚 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🛠️ Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool and dev server
- **React Flow 11.10.4** - Flow diagram library
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📖 API Reference

### Node Data Structure

```javascript
{
  id: 'node_1',
  type: 'textNode',
  position: { x: 100, y: 100 },
  data: {
    label: 'Your message text',
    onDelete: (nodeId) => {} // Delete handler
  }
}
```

### Edge Data Structure

```javascript
{
  id: 'edge_1',
  source: 'node_1',
  target: 'node_2',
  type: 'customEdge',
  animated: true,
  data: {
    onDelete: (edgeId) => {} // Delete handler
  }
}
```

## 🎨 Component Documentation

### TextNode
Custom node component for displaying messages.

**Props:**
- `data` - Node data containing label and handlers
- `selected` - Boolean indicating selection state
- `id` - Unique node identifier

### NodesPanel
Panel displaying available node types for drag and drop.

**Features:**
- Draggable node templates
- Extensible design for future node types

### SettingsPanel
Settings panel for editing selected node properties.

**Props:**
- `selectedNode` - Currently selected node object
- `onUpdateNode` - Callback for updating node data
- `onClose` - Callback to close panel

### EdgeEditButton
Custom edge component with delete functionality.

**Features:**
- Delete button at edge midpoint
- Hover effects
- Custom styling

### FlowBuilder
Main orchestrator component managing the entire flow.

**State:**
- `nodes` - Array of node objects
- `edges` - Array of edge objects
- `selectedNode` - Currently selected node
- `errorMessage` - Current error message

## 🔒 Validation Rules

1. **Source Handle**: Can only have ONE outgoing connection
2. **Target Handle**: Can have MULTIPLE incoming connections
3. **Save Validation**: If more than one node exists, only ONE node can have an empty target handle

## 🐛 Troubleshooting

### Connection line not visible
- Ensure you're using the latest version
- Check browser console for errors
- Clear cache and restart dev server

### Nodes not draggable
- Make sure `draggable` attribute is set on node items
- Check that event handlers are properly bound

### Styles not applying
- Run `npm install` to ensure all dependencies are installed
- Verify Tailwind is properly configured
- Check that `index.css` imports Tailwind directives

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use functional components with hooks
- Follow ESLint configuration
- Add comments for complex logic
- Keep components small and focused

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - Amazing flow library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icon set
- [Vite](https://vitejs.dev/) - Lightning fast build tool

## 📧 Contact

Project Link: [https://github.com/LakshyaVerma123kl/ChatBot-Flow-Builder](https://github.com/LakshyaVerma123kl/chatbot-flow-builder)

---

Made with ❤️ by [Your Name]

// ============================================
// FILE: LICENSE
// ============================================
MIT License

Copyright (c) 2024 Chatbot Flow Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

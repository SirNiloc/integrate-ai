## Integrate AI Module for Foundry VTT

**Accelerate AI integration for your Foundry VTT modules** with the lightweight, developer-friendly *Integrate AI* module. This module provides a foundation for connecting your systems to local and remote AI APIs, enabling you to build intelligent, dynamic gameplay experiences without the complexity of API setup.

### Developer-Friendly Features

- **Simple API Abstraction:** Clean static methods (`processWithAI` and `chatWithAI`) that handle all HTTP communication and JSON parsing for you.
- **Configuration Management:** Built-in settings system using `game.settings.register` for base URL and model selection, making your module’s AI integration configurable by world creators.
- **Modular Design:** Easy-to-use class structure (`IntegrateAI`) that can be extended or imported into any module with minimal overhead.
- **Error Handling:** Comprehensive error management with detailed console logging for debugging AI interactions.
- **Flexible Integration:** Works with any AI API that supports typical generate/chat endpoints (e.g., Ollama, LLaMA.cpp, local models).

### Quick Integration

Simply import the module and use the provided static methods to connect to your AI backend:

```javascript
const response = await IntegrateAI.processWithAI("Generate a fantasy creature description");
const chatResponse = await IntegrateAI.chatWithAI([
  {
    role: "user",
    content: "What is the weather like?"
  }
]);

```
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>Integrate AI Module for Foundry VTT</h2>
  
  <p><strong>Accelerate AI integration for your Foundry VTT modules</strong> with our lightweight, developer-friendly <em>Integrate AI</em> module. This module provides a foundation for connecting your modules to local and remote AI APIs, enabling you to build intelligent, dynamic gameplay experiences without the complexity of API setup.</p>

  <h3>Developer-Friendly Features:</h3>
  <ul>
    <li><strong>Simple API Abstraction:</strong> Clean static methods (<code>processWithAI</code> and <code>chatWithAI</code>) that handle all HTTP communication and JSON parsing for you.</li>
    <li><strong>Configuration Management:</strong> Built-in settings system with <code>game.settings.register</code> for base URL and model selection, making your module's AI integration configurable by world creators.</li>
    <li><strong>Modular Design:</strong> Easy-to-use class structure (<code>IntegrateAI</code>) that can be extended or imported into any module with minimal overhead.</li>
    <li><strong>Error Handling:</strong> Comprehensive error management built-in, with detailed console logging for debugging AI interactions.</li>
    <li><strong>Flexible Integration:</strong> Works with any AI API that supports the standard generate/chat endpoints (e.g., Ollama, LLaMA.cpp, local models).</li>
  </ul>

  <h3>Quick Integration:</h3>
  <p>Simply import the module and use the provided static methods to connect to your AI backend:</p>
  <pre><code>const response = await IntegrateAI.processWithAI("Generate a fantasy creature description");</code></pre>
  <pre><code>const chatResponse = await IntegrateAI.chatWithAI([{ 
		  role: "user",
		  content: "What is the weather like?" 
}]);</code></pre>

  <h3>Perfect for Module Developers:</h3>
  <p>Whether you're building an NPC dialogue system, automated quest generator, or intelligent world-building tool, this module gives you the foundation to seamlessly integrate AI capabilities into your Foundry VTT modules. No more reinventing the wheel – focus on your creative vision, not API complexity.</p>
</div>

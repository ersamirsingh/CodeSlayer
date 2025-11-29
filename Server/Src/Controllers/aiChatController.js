import { agentExecutor } from "../AI/agent.js";

export const aiChatController = async (req, res) => {
  try {
    const user = req.user; // from cookie authentication
    const msg = req.body.message;

    const response = await agentExecutor.invoke({
      input: msg,
      userId: user._id.toString()
    });

    res.json({
      success: true,
      reply: response.output
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      reply: "AI error"
    });
  }
};

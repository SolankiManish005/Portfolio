import mongoose, { Document, Model, Schema } from "mongoose";

export type ChatRole = "user" | "assistant";

export interface IChatMessage {
  role: ChatRole;
  content: string;
  createdAt?: Date;
}

export interface IChatConversation extends Document {
  sessionId: string;
  messages: IChatMessage[];
  visitorName?: string;
  visitorEmail?: string;
  visitorIP?: string;
  syncedToSheet?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);

const ChatConversationSchema = new Schema<IChatConversation>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: {
      type: [ChatMessageSchema],
      default: [],
    },
    visitorName: {
      type: String,
      default: null,
    },
    visitorEmail: {
      type: String,
      default: null,
    },
    visitorIP: {
      type: String,
      default: null,
    },
    syncedToSheet: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const ChatConversation: Model<IChatConversation> =
  mongoose.models.ChatConversation ||
  mongoose.model<IChatConversation>("ChatConversation", ChatConversationSchema);

export default ChatConversation;

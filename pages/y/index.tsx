import { getChatHistory1 } from '@/utils/firebase';
import withChat from '@/components/Chat/WithChat';

const Chat1 = withChat(getChatHistory1);
export default Chat1;

import { getChatHistory2 } from '@/utils/firebase';
import withChat from '@/components/Chat/WithChat';

const Chat2 = withChat(getChatHistory2);
export default Chat2;

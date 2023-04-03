import { getChatHistory1 } from '@/utils/firebase';
import withChat from '@/components/Chat/WithChat';
import withAuth from '../withAuth';
    
const Chat1 = withChat(getChatHistory1);
export default withAuth(Chat1);

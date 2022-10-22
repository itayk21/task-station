import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import './chat-style';

const chat = () => {
    return (
        <ChatEngine>
            projectId={'d4ef90cd-0fb9-418a-bc64-fc72bc6cdbd1'}
            userName={'itayk21'}
            userSecret={'123123'}
        </ChatEngine>
    )
}

export default chat
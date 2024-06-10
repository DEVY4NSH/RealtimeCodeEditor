import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import TypingAnimation from './TypingAnimation';

const DescriptionBox = () => {
    const props = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { duration: 1000 },
    });

    const description = "Hey there! Ever wished you could team up with your buddies and crack coding challenges together, in real-time? Well, now you can! Imagine a virtual space where you and your friends can huddle up, share code, and solve problems together, all at the same time. Our platform brings this vision to life with our real-time code editor. It's like having a digital workspace where you can brainstorm, troubleshoot, and learn from each other, all in one place. No more waiting for emails or messages to sync up, you will see every change your friends make as they type, instantly. It is completely free to use. So whether you are a seasoned coder looking to collaborate with your team or a student seeking a helping hand from friends, our platform has got you covered !                      HAPPY LEARNING"

    return (
        <animated.div style={props} className="description-box">
            <h1>Realtime Code Editor</h1>
            <TypingAnimation text={description} />
        </animated.div>
    );
}

export default DescriptionBox;
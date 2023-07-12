import { useEffect } from "react";
import { useAnimate, useInView } from "framer-motion";

const TextMessage = ({setMessage}) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, { threshold: 0.5 });
    useEffect(() => {
      
        if (isInView) {
            animate(scope.current, { opacity: 1 });
            setMessage(true)
        } else {
            animate(scope.current, { opacity: 0 });
            setMessage(false)
        }
    }, [isInView]);

    return (
        <div ref={scope} className="flex items-center">
        </div>
    );
};

export default TextMessage;

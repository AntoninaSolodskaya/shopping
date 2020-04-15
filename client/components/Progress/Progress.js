import React from 'react';
import { styles } from "./styles";

import LinearProgress from '@material-ui/core/LinearProgress';

const LinearDeterminate = () => {
    const classes = styles();
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        function progress() {
            setCompleted((oldCompleted) => {
                if (oldCompleted === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={completed} />
        </div>
    );
}

export default LinearDeterminate;
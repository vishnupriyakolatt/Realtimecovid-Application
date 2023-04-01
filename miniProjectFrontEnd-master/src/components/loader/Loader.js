import { BeatLoader } from "react-spinners";
const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "60px",
    },
    centerit: {
        marginTop: "230px"
    },
    heading: {
        backgroundColor: "lightblue",
        width: "986px",
        textAlign: "center",
        padding: "10px"
    }
}

export const Loader = (props) => {
    return (
        <div style={styles.container}>
            { props.centerit ? (<BeatLoader loading css={styles.centerit} />) :
                <BeatLoader loading />}

        </div>
    )
}
interface IButton {
    text?: string;
}

export const Button = ({ text = "Hello World" }: IButton) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {text}
        </button>
    );
};

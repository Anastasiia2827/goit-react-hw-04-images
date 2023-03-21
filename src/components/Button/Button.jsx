import { ButtonLoad } from './Button.styled';

function Button({ loadMore }) {
    return (
        <ButtonLoad  type="button" onClick={loadMore}>
            Load more
        </ButtonLoad >
    );
}

export default Button;
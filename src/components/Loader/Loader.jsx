import { Dna } from 'react-loader-spinner';

import {Load} from './Loader.styled'

function Loader() {
    return (
        <Load>
            <Dna
                visible={true}
                height="80"
                width="400"
            />
        </Load>
    );
}

export default Loader;
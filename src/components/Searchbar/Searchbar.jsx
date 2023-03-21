// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ImSearch } from "react-icons/im";

import { Forma, Label, SearchForm , Button, ErrorText } from './Searchbar.styled';

const schema = yup.object().shape({
    query: yup.string().required('Search'),
});

const Searchbar = ({ onSubmit }) => {
    const handleSubmit = (query, { resetForm }) => {
        onSubmit(query);
        resetForm();
    }

    const initialValues = {
        query: '',
    };

    return (
         <Formik
   initialValues={initialValues}
   onSubmit={handleSubmit}
   validationSchema={schema}
 >
   <Forma>
     <Label>
       <SearchForm  type="text" name="query" />
       <ErrorText name="query" component="div"/>
     </Label>
     <Button type="submit"> <ImSearch  style={{ width: 30, height: 30 }} /></Button >
   </Forma>
 </Formik>
    )
}

// Searchbar.prototype = {
  // onSubmit: PropTypes.func.isRequired,
// };

export default Searchbar;

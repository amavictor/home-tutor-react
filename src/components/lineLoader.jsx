
import { PropTypes } from 'prop-types';
export const LineLoader = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50">
                    <div className="w-full h-1 bg-primary-color animate-moveLine" />
                    <div className="absolute top-1 left-0 w-screen h-screen bg-gray-200 bg-opacity-30 backdrop-blur-md z-40" />
                </div>
            )}
        </>
    );
};

LineLoader.propTypes = {
    loading: PropTypes.bool
}
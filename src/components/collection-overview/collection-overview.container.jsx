import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// 等同於 export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps), // 這裡會自動帶入 props 到下一層的component，也就是我們自訂的 WithSpinner
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
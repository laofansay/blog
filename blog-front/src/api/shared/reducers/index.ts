import { ReducersMapObject } from '@reduxjs/toolkit';

// import authentication from './authentication';
import tag from './tag.reducer';
import category from './category.reducer';
import blog from './blog.reducers';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  // authentication,
  tag,
  category,
  blog
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

const rootReducer: ReducersMapObject = {
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  ...entitiesReducers,
};

export default rootReducer;


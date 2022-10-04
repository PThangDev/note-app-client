import { routePaths } from 'src/configs';
import DefaultLayout from 'src/layouts/DefaultLayout';
import EmptyLayout from 'src/layouts/EmptyLayout';
import { PrivateRouter } from '../components/OuterRoute';

import EditNotePage from 'src/pages/edit-note';
import HomePage from 'src/pages/home';
import NewNotePage from 'src/pages/new-note';

import NoteDetailPage from 'src/pages/note-detail';
import NoteDetailRouter from 'src/pages/note-detail/NoteDetailRouter';
import NotesPage from 'src/pages/notes';
import OtherNotesPage from 'src/pages/other-notes';
import PinsPage from 'src/pages/pins';
import ProfilePage from 'src/pages/profile';
import SearchPage from 'src/pages/search';
import TopicDetailPage from 'src/pages/topic-detail';
import TopicDetailRouter from 'src/pages/topic-detail/TopicDetailRouter';
import TopicsPage from 'src/pages/topics';
import TrashsPage from 'src/pages/trashs';

const privateRoutes = [
  {
    path: routePaths.home.path,
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.notes.path,
    component: NotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.newNote.path,
    component: NewNotePage,
    layout: EmptyLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.editNote.path,
    component: EditNotePage,
    layout: EmptyLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.noteDetailRouter.path,
    component: NoteDetailRouter,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.noteDetail.path,
    component: NoteDetailPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topics.path,
    component: TopicsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topicDetail.path,
    component: TopicDetailPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topicDetailRouter.path,
    component: TopicDetailRouter,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.pins.path,
    component: PinsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.others.path,
    component: OtherNotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.profile.path,
    component: ProfilePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.trashs.path,
    component: TrashsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.search.path,
    component: SearchPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
];

export default privateRoutes;

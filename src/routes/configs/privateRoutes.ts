import { lazy } from 'react';
import { routePaths } from 'src/configs';
import DefaultLayout from 'src/layouts/DefaultLayout';
import EmptyLayout from 'src/layouts/EmptyLayout';
import { PrivateRouter } from '../components/OuterRoute';

const HomePage = lazy(() => import('src/pages/home'));
const NotesPage = lazy(() => import('src/pages/notes'));
const NoteDetailPage = lazy(() => import('src/pages/note-detail'));
const NoteDetailRouter = lazy(() => import('src/pages/note-detail/NoteDetailRouter'));
const NewNotePage = lazy(() => import('src/pages/new-note'));
const EditNotePage = lazy(() => import('src/pages/edit-note'));
const OtherNotesPage = lazy(() => import('src/pages/other-notes'));
const TopicsPage = lazy(() => import('src/pages/topics'));
const TopicDetailPage = lazy(() => import('src/pages/topic-detail'));
const TopicDetailRouter = lazy(() => import('src/pages/topic-detail/TopicDetailRouter'));
const PinsPage = lazy(() => import('src/pages/pins'));
const TrashsPage = lazy(() => import('src/pages/trashs'));
const ProfilePage = lazy(() => import('src/pages/profile'));
const SearchPage = lazy(() => import('src/pages/search'));

const privateRoutes = [
  {
    path: routePaths.home,
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.notes,
    component: NotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.newNote,
    component: NewNotePage,
    layout: EmptyLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.editNote,
    component: EditNotePage,
    layout: EmptyLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.noteDetailRouter,
    component: NoteDetailRouter,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.noteDetail,
    component: NoteDetailPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topics,
    component: TopicsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topicDetail,
    component: TopicDetailPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topicDetailRouter,
    component: TopicDetailRouter,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.pins,
    component: PinsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.others,
    component: OtherNotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.profile,
    component: ProfilePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.trashs,
    component: TrashsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.search,
    component: SearchPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
];

export default privateRoutes;

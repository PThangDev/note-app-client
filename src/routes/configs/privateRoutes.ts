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
const TopicsPage = lazy(() => import('src/pages/topics'));
const TopicDetailPage = lazy(() => import('src/pages/topic-detail'));
const TopicDetailRouter = lazy(() => import('src/pages/topic-detail/TopicDetailRouter'));
const PinsPage = lazy(() => import('src/pages/pins'));
const TrashsPage = lazy(() => import('src/pages/trashs'));
const ProfilePage = lazy(() => import('src/pages/profile'));
const SearchPage = lazy(() => import('src/pages/search'));

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

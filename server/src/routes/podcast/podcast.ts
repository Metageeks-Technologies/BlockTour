import {createPodcast, deletePodcast, getAllPodcasts, getPodcastById, getPodcastByPermaLink, updatePodcast} from '../../controllers/podcastController';
import express from 'express';

const podcastRouter = express.Router();

podcastRouter.post('/create-podcast', createPodcast);
podcastRouter.get('/all-podcasts', getAllPodcasts);
podcastRouter.get('/podcasts/:id', getPodcastById);
podcastRouter.put('/podcasts/:id', updatePodcast);
podcastRouter.delete('/podcasts/:id', deletePodcast);
podcastRouter.get('/podcast/:permaLink', getPodcastByPermaLink);

export default podcastRouter;
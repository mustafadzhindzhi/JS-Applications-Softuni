import { del, get, post, put } from "./api.js";

const endpoints = {
    'albums': '/data/albums',
    'getAllAlbums': "/data/albums?sortBy=_createdOn%20desc",
    "singleAlbum": "/data/albums/",
}

export async function createAlbum(data) {
    return post(endpoints.albums, data)
};

export async function getAllAlbums() {
    return get(endpoints.getAllAlbums)
};

export async function getDetailsById(id) {
    return get(endpoints.singleAlbum + id);
}

export async function deleteAlbumById(id) {
    return del(endpoints.singleAlbum + id);
}

export async function updateAlbum(id, data) {
    return put(endpoints.singleAlbum + id, data)
};

export async function likeAlbum(albumId) {
    return post('/data/likes', {
        albumId
    })
};

export async function getLikesByAlbumId(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
};

export async function getMyLikesByAlbumId(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
};
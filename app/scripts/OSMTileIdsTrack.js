import * as PIXI from 'pixi.js';
import { initTile, drawTile } from './Id2DTiledPixiTrack';
import OSMTilesTrack from './OSMTilesTrack';
import PixiTrack from './PixiTrack';

class OSMTileIdsTrack extends OSMTilesTrack {
  constructor(scene, options, animate) {
    super(scene, options, animate);
  }

  
  initTile(tile) {
    initTile.bind(this)(tile);

    this.drawTile(tile);
  }

  drawTile(tile) {

    drawTile.bind(this)(tile);
  }

  areAllVisibleTilesLoaded() {
    // we don't need to wait for any tiles to load before
    // drawing
    //
    return true;
  }
  
  fetchNewTiles(toFetch) {
    // no real fetching involved... we just need to display the data
    toFetch.map((x) => {
      const key = x.remoteId;
      const keyParts = key.split('.');

      const data = {
        zoomLevel: keyParts[0],
        tilePos: keyParts.slice(1, keyParts.length).map(x => +x),
      };

      this.fetchedTiles[x.tileId] = x;
      this.fetchedTiles[x.tileId].tileData = data;

      // since we're not actually fetching remote data, we can easily
      // remove these tiles from the fetching list
      if (this.fetching.has(x.remoteId)) { this.fetching.delete(x.remoteId); }
    });

    this.synchronizeTilesAndGraphics();
  }
}

export default OSMTileIdsTrack;
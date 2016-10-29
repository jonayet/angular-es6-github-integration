/**
 * Created by jonayet on 10/29/16.
 */
import {githubService} from './github.service';

describe('Github Service', () => {
    it('should export githubService name', () => {
        expect(githubService).toBe('githubService');
    });
});
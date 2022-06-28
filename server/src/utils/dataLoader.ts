import DataLoader from 'dataloader';
import { User } from './../entities/User';

const badGetUsers = async (userIds: number[]) => {
    const user = await User.findByIds(userIds);
    return userIds.map(userId => user.find(user => user.id == userId));
}
export const buildDataLoader = () => ({
    userLoader: new DataLoader<number, User | undefined>(userIds => badGetUsers(userIds as number[])),
})
export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  incrementActiveToInactiveCounter = () => {
    this.activeToInactiveCounter++;
    console.log('Active to Inactive ' + this.activeToInactiveCounter);
  }

  incrementInactiveToActiveCounter = () => {
    this.inactiveToActiveCounter++;
    console.log('Inactive to Active ' + this.inactiveToActiveCounter);
  }
}

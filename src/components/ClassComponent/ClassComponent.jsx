import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Игра с угадыванием числа. Введите число:',
    userNumber: '',
    prevUserNumber: '',
    randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min)) + this.props.min,
    count: 0,
    gameEnd: 'false',
  };
  // this.handleSubmit = this.handleSubmit.bind(this);

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!this.state.prevUserNumber && this.state.count === 0 && this.state.userNumber === '') {
        return {
          result: 'Вы ничего не ввели. Введите число!'
        };
      }

      if (!this.state.prevUserNumber && this.state.userNumber === '') {
        return {
          result: `Вы ничего не ввели. Введите число!`
        };
      }

      if (state.prevUserNumber > state.randomNumber) {
        return {
          result: `${state.prevUserNumber} больше загаданного`,
        };
      }

      if (state.prevUserNumber < state.randomNumber) {
        return {
          result: `${state.prevUserNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.prevUserNumber},
        попыток ${state.count}`,
        gameEnd: 'true',
      };
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClickGuess = () => {
    this.setState({
      prevUserNumber: this.state.userNumber,
      userNumber: '',
    });
  };

  handleClickStartGame = () => {
    this.setState({
      result: 'Игра началась заново. Введите число:',
      prevUserNumber: '',
      randomNumber:
        Math.floor((Math.random() * this.props.max - this.props.min)) + this.props.min,
      count: 0,
      gameEnd: 'false',
    });
  };


  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
          />

          <button className={style.btn} onClick={this.handleClickGuess}>Угадать</button>
        </form>

        <div className={style.start}>
          {this.state.gameEnd === 'true' ? <button className={style.btn} onClick={this.handleClickStartGame}>Сыграть ещё</button> : <></>}
        </div>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};

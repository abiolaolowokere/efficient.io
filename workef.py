import yfinance as yf
import numpy as np
import matplotlib.pyplot as plt

# Define the stocks to download data for
stock_list = ['AAPL', 'GOOG', 'AMZN']

# Download the stock data
data = yf.download(stock_list, start='2020-01-01', end='2022-12-31')

# Calculate the daily returns for each stock
returns = data['Adj Close'].pct_change()

# Calculate the mean returns and covariance matrix
mean_returns = returns.mean()
cov_matrix = returns.cov()

# Define the number of portfolios to create
num_portfolios = 25000

# Create an array to hold the returns for each portfolio
portfolio_returns = np.zeros(num_portfolios)
portfolio_volatility = np.zeros(num_portfolios)

# Create an array to hold the weights for each portfolio
portfolio_weights = np.zeros((num_portfolios, len(stock_list)))

# Create a loop to generate the portfolios
for i in range(num_portfolios):
    # Select random weights for the stocks
    weights = np.random.random(len(stock_list))
    # Normalize the weights so they add up to 1
    weights /= np.sum(weights)
    # Save the weights to the portfolio_weights array
    portfolio_weights[i, :] = weights
    # Calculate the return and volatility for the portfolio
    portfolio_returns[i] = np.sum(mean_returns * weights) * 252
    portfolio_volatility[i] = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))) * np.sqrt(252)

# Plot the efficient frontier
plt.scatter(portfolio_volatility, portfolio_returns, c=portfolio_returns / portfolio_volatility, marker='o')
plt.xlabel('Expected Volatility')
plt.ylabel('Expected Return')
plt.colorbar(label='Sharpe Ratio')
plt.show()

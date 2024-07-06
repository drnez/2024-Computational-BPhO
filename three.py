import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

def sin(deg):
    return math.sin(math.radians(deg))
def cos(deg):
    return math.cos(math.radians(deg))
def tan(deg):
    return math.tan(math.radians(deg))
def arctan(value):
    return math.degrees(math.atan(value))

def min_u_theta(X, Y):
    return arctan( (Y + math.sqrt(X*X + Y*Y))/X )
def min_u_value(X, Y):
    return math.sqrt( g*(targetY + math.sqrt(X*X + Y*Y)) )
def min_u_plots(u, theta):
    # initalisation:
    x = []
    y = []
    t = 0
    x_now = 0
    y_now = 0

    while (x_now <= targetX):
        x.append(x_now)
        y.append(y_now)
        
        x_now = u*t*cos(theta)
        y_now = u*t*sin(theta) - 0.5*g*t*t

        t += t_step

    return x, y


# user adjustables:
#u = int(input("Enter 'u': "))
targetX = int(input("Enter target 'X': "))
targetY = int(input("Enter target 'Y': "))
g = 9.81
t_step = 0.02


# find + plot min_u values
Min_u_t = min_u_theta(targetX, targetY)
print("Min 'u' theta is ", Min_u_t)
min_u = min_u_value(targetX, targetY)
print("Min 'u' is ", min_u)
ax.plot(min_u_plots(min_u, Min_u_t)[0], min_u_plots(min_u, Min_u_t)[1])

plt.show()

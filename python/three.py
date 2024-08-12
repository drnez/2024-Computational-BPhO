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
def min_u_value(X, Y, g):
    return math.sqrt( g*(TargetY + math.sqrt(X*X + Y*Y)) )

def u_plots(u, g, theta):
    # initalisation:
    x = []
    y = []
    t = 0
    x_now = 0
    y_now = 0
    t_step = 0.02

    while (x_now <= TargetX):
        x.append(x_now)
        y.append(y_now)
        
        x_now = u*t*cos(theta)
        y_now = u*t*sin(theta) - 0.5*g*t*t

        t += t_step

    return x, y

def u_theta(X, Y, u, g, Sign):
    a = (g/(2*u*u))*X*X
    b = -X
    c = Y + (g*X*X)/(2*u*u)

    Discriminant = b*b - 4*a*c
    Numerator = -b
    if Sign == '+':
        Numerator += math.sqrt(Discriminant)
    elif Sign == '-':
        Numerator -= math.sqrt(Discriminant)
    return arctan(Numerator/(2*a))

# user adjustables:
User_u = int(input("Enter 'u': "))
TargetX = int(input("Enter Target 'X': "))
TargetY = int(input("Enter Target 'Y': "))
User_g = 9.81

# find + plot min_u values
Min_u_t = min_u_theta(TargetX, TargetY)
print("Min 'u' theta is ", Min_u_t)
Min_u = min_u_value(TargetX, TargetY, User_g)
print("Min 'u' is ", Min_u)
Min_u_plots = u_plots(Min_u, User_g, Min_u_t)
ax.plot(Min_u_plots[0], Min_u_plots[1])

# low + high ball
Low_theta = u_theta(TargetX, TargetY, User_u, User_g, '-')
print("Low theta is ", Low_theta)
High_theta = u_theta(TargetX, TargetY, User_u, User_g, '+')
print("High theta is ", High_theta)
Low_t_plots = u_plots(User_u, User_g, Low_theta)
High_t_plots = u_plots(User_u, User_g, High_theta)
print("maths done")
ax.plot(Low_t_plots[0], Low_t_plots[1])
ax.plot(High_t_plots[0], High_t_plots[1])

plt.show()

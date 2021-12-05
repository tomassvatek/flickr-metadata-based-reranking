# min-max normalization
def rescale_value(min, max, value):
    if max - min == 0:
        raise ZeroDivisionError()
    return (value - min) / (max - min)

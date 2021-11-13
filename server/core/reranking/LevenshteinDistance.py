def levenshtein_distance(token1, token2):
    distances = __init_distance(len(token1), len(token2))

    for i in range(1, len(token1) + 1):
        for j in range(1, len(token2) + 1):
            if token1[i - 1] == token2[j - 1]:
                distances[i][j] = distances[i-1][j-1]
            else:
                distances[i][j] = min(
                    distances[i][j-1], distances[i-1][j], distances[i-1][j-1]) + 1

    __print_distance(distances, len(token1), len(token2))
    return distances[len(token1)][len(token2)]


def __init_distance(token1_length, token2_length):
    distances = []
    for i in range(token1_length + 1):
        row = []
        for j in range(token2_length + 1):
            if i == 0:
                row.append(j)
            elif j == 0:
                row.append(i)
            else:
                row.append(0)
        distances.append(row)
    return distances


def __print_distance(distances, token1_length, token2_length):
    for i in range(token1_length + 1):
        for j in range(token2_length + 1):
            print(int(distances[i][j]), end=" ")
        print()

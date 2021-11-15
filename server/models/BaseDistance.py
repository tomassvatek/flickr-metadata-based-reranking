from abc import ABC, abstractmethod


class BaseDistance:
    @abstractmethod
    def measure_distance(self, photo, params):
        pass

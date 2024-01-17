<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserSubscriber implements EventSubscriberInterface
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {

        $this->hasher = $hasher;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodeUserPassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodeUserPassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || (Request::METHOD_POST !== $method && Request::METHOD_PUT !== $method)) {
            return;
        }

        $user->setPassword($this->hasher->hashPassword($user, $user->getPassword()));
        $user->setRoles(['ROLE_ADMIN']);
    }
}